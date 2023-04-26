resource "aws_lambda_function" "save-mood" {
  function_name = "save-mood"
  role = aws_iam_role.mood-lambda-role.arn
  handler = "index.handler"
  runtime = "nodejs14.x"
  filename = "../backend/lambda/dist/index.zip"
}

resource "aws_lambda_function" "get-trend" {
  function_name = "get-trend"
  role = aws_iam_role.mood-lambda-role.arn
  handler = "mood-trend.handler"
  runtime = "nodejs14.x"
  filename = "../backend/lambda/dist/index.zip"
}

resource "aws_iam_role" "mood-lambda-role" {
  name = "mood-lambda-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_lambda_permission" "allow_api" {
  statement_id  = "AllowAPIgatewayInvokation"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.save-mood.function_name
  principal     = "apigateway.amazonaws.com"
}

resource "aws_lambda_permission" "get-trend-allow-api" {
  statement_id  = "AllowAPIgatewayInvokation"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get-trend.function_name
  principal     = "apigateway.amazonaws.com"
}

resource "aws_iam_role_policy_attachment" "lambda-policy" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  role = aws_iam_role.mood-lambda-role.name
}

resource "aws_iam_role_policy_attachment" "dynamo-db-policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
  role = aws_iam_role.mood-lambda-role.name
}

