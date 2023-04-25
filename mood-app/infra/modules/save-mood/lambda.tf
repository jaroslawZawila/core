resource "aws_lambda_function" "print-input" {
  function_name = "print-input"
  role = aws_iam_role.print-input-role.arn
  handler = "index.handler"
  runtime = "nodejs14.x"
  filename = "../lambda/save-mood/dist/index.zip"
}

resource "aws_lambda_function" "get-trend" {
  function_name = "get-trend"
  role = aws_iam_role.print-input-role.arn
  handler = "mood-trend.handler"
  runtime = "nodejs14.x"
  filename = "../lambda/save-mood/dist/index.zip"
}

resource "aws_iam_role" "print-input-role" {
  name = "print-input"
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
  function_name = aws_lambda_function.print-input.function_name
  principal     = "apigateway.amazonaws.com"
}

resource "aws_lambda_permission" "get-trend-allow-api" {
  statement_id  = "AllowAPIgatewayInvokation"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.get-trend.function_name
  principal     = "apigateway.amazonaws.com"
}

resource "aws_iam_role_policy_attachment" "print-input-policy-lambda-att" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  role = aws_iam_role.print-input-role.name
}

resource "aws_iam_role_policy_attachment" "print-input-policy-dynamo-att" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
  role = aws_iam_role.print-input-role.name
}

