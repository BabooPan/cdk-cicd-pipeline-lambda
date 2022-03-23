export async function handler(event: string) {

  console.log('Event', event);

  console.log('Stage Name is: ' + process.env.stage);

  var response = {
    statusCode: 200,
    body: 'Hello from a Lambda Function',
  };

  console.log(response);

  return response;
}