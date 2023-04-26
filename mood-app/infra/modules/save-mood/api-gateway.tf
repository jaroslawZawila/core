resource "aws_api_gateway_rest_api" "save-mood-api" {
  name        = "SaveMood"
  description = ""
  endpoint_configuration {
    types = ["REGIONAL"]
  }
}

# Save mood api
resource "aws_api_gateway_resource" "save-mood-proxy" {
  rest_api_id = "${aws_api_gateway_rest_api.save-mood-api.id}"
  parent_id   = "${aws_api_gateway_rest_api.save-mood-api.root_resource_id}"
  path_part   = "mood"
}

resource "aws_api_gateway_method" "save-mood-method" {
  rest_api_id   = "${aws_api_gateway_rest_api.save-mood-api.id}"
  resource_id   = "${aws_api_gateway_resource.save-mood-proxy.id}"
  http_method   = "POST"
  authorization = "NONE"
  api_key_required = true
}

resource "aws_api_gateway_integration" "save-mood-lambda-integration" {
  rest_api_id = "${aws_api_gateway_rest_api.save-mood-api.id}"
  resource_id = "${aws_api_gateway_method.save-mood-method.resource_id}"
  http_method = "${aws_api_gateway_method.save-mood-method.http_method}"

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "${aws_lambda_function.save-mood.invoke_arn}"
}

#Get trend api
resource "aws_api_gateway_resource" "trend-proxy" {
  rest_api_id = "${aws_api_gateway_rest_api.save-mood-api.id}"
  parent_id   = "${aws_api_gateway_rest_api.save-mood-api.root_resource_id}"
  path_part   = "trends"
}

resource "aws_api_gateway_resource" "get-trend-proxy" {
  rest_api_id = "${aws_api_gateway_rest_api.save-mood-api.id}"
  parent_id   = "${aws_api_gateway_resource.trend-proxy.id}"
  path_part   = "{userId}"
}

resource "aws_api_gateway_method" "get-trend-method" {
  rest_api_id   = "${aws_api_gateway_rest_api.save-mood-api.id}"
  resource_id   = "${aws_api_gateway_resource.get-trend-proxy.id}"
  http_method   = "GET"
  authorization = "NONE"
  api_key_required = false
}

resource "aws_api_gateway_integration" "get-trend-lambda-integration" {
  rest_api_id = "${aws_api_gateway_rest_api.save-mood-api.id}"
  resource_id = "${aws_api_gateway_method.get-trend-method.resource_id}"
  http_method = "${aws_api_gateway_method.get-trend-method.http_method}"

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "${aws_lambda_function.get-trend.invoke_arn}"
}

resource "aws_api_gateway_deployment" "save-mood-api-deployment" {
  depends_on = [
    aws_api_gateway_integration.get-trend-lambda-integration,
    aws_api_gateway_integration.save-mood-lambda-integration
  ]

  rest_api_id = "${aws_api_gateway_rest_api.save-mood-api.id}"
  stage_name  = "test"
}

resource "aws_api_gateway_api_key" "save-mood-key" {
  name = "save-mood"
  value = "34fbebf08bf047faa8f44b6ea5e0fe9a"
}

#Cloud watch for api gateway
resource "aws_api_gateway_account" "demo" {
  cloudwatch_role_arn = aws_iam_role.cloudwatch.arn
}

data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["apigateway.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "cloudwatch" {
  name               = "api_gateway_cloudwatch_global"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

data "aws_iam_policy_document" "cloudwatch" {
  statement {
    effect = "Allow"

    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:DescribeLogGroups",
      "logs:DescribeLogStreams",
      "logs:PutLogEvents",
      "logs:GetLogEvents",
      "logs:FilterLogEvents",
    ]

    resources = ["*"]
  }
}
resource "aws_iam_role_policy" "cloudwatch" {
  name   = "default"
  role   = aws_iam_role.cloudwatch.id
  policy = data.aws_iam_policy_document.cloudwatch.json
}


