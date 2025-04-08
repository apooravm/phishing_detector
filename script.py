import json

import os

import boto3

import joblib

import numpy as np

import re

from urllib.parse import urlparse

# Environment variables for S3 bucket and key

MODEL_BUCKET = os.environ.get('MODEL_BUCKET', 'uni-main-bucket')

MODEL_KEY = os.environ.get('MODEL_KEY', 'phishing_model.pkl')

# Global variable to cache the loaded model

model = None

# Initialize S3 client (ensure your Lambda has S3 access permissions)

s3 = boto3.client('s3')

def load_model():

  """Load the model from S3 to /tmp if not already loaded."""

  global model

  if model is None:

    model_path = '/tmp/phishing_model.pkl'

    # Download the model file from S3 if it doesn't exist in /tmp

    if not os.path.exists(model_path):

      s3.download_file(MODEL_BUCKET, MODEL_KEY, model_path)

    model = joblib.load(model_path)

  return model

def extract_features(url):

  """Extract features from the URL (must match the training feature extraction)."""

  features = {}

  features['length'] = len(url)

  features['dot_count'] = url.count('.')

  features['has_at'] = 1 if '@' in url else 0

  try:

    domain = urlparse(url).hostname

    ip_pattern = r"^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$"

    features['is_ip'] = 1 if re.match(ip_pattern, domain) else 0

  except Exception:

    features['is_ip'] = 1 # Flag as suspicious if parsing fails

  suspicious_keywords = [

    "login", "secure", "account", "update", "verify", "signin",

    "confirm", "billing", "paypal", "bank", "credit", "debit", "password",

    "security", "alert", "urgent", "suspend", "reactivate", "notify",

    "authenticate", "validate", "fraud", "scam", "renew"

  ]

  features['keyword_count'] = sum(url.lower().count(kw) for kw in suspicious_keywords)

  # Return features in the order expected by the model

  return [features['length'], features['dot_count'], features['has_at'], features['is_ip'], features['keyword_count']]

def lambda_handler(event, context):

  """

  AWS Lambda handler function.

  Expects a JSON payload with a "url" key.

  """

  try:

    # Parse the input. API Gateway usually sends the request body as a JSON string.

    body = event.get('body')

    if body is None:

      return {

        'statusCode': 400,

        'body': json.dumps({'error': 'Missing request body.'})

      }

    data = json.loads(body)

    url = data.get('url')

    if not url:

      return {

        'statusCode': 400,

        'body': json.dumps({'error': 'URL not provided.'})

      }

    # Extract features from the URL

    features = extract_features(url)

    features = np.array(features).reshape(1, -1)

    # Load model and make a prediction

    m = load_model()

    prediction = m.predict(features)[0]

    result = 'Phishing' if prediction == 1 else 'Legitimate'

    # Return the result as a JSON response

    return {

      'statusCode': 200,

      'body': json.dumps({'prediction': result})

    }

  except Exception as e:

    return {

      'statusCode': 500,

      'body': json.dumps({'error': str(e)})

    }
