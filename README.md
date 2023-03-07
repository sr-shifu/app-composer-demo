Find more details in my [post](https://thesametech.com/infra-as-diagram/).

### Development Environment Prerequisites
- Create your AWS account to access AWS Console
- Install AWS SAM: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html#install-sam-cli-instructions
- Install AWS CLI: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
- Install Docker: https://docs.docker.com/get-docker/

### Setup
1. Clone this repo.  
1. Create Docker network (do it once in your first setup): *docker network create sam-demo-net*
1. Start DynamoDB Local by executing the following at the command prompt:  
	*docker run -p 8000:8000 --network sam-demo-net --name ddblocal amazon/dynamodb-local*  
    This will run the DynamoDB local in a docker container at port 8000.  
1. At the command prompt, list the tables on DynamoDB Local by executing:  
    *aws dynamodb list-tables --endpoint-url http://localhost:8000*  
1. An output such as the one shown below confirms that the DynamoDB local instance has been installed and running:  
    *{*  
      *"TableNames": []*   
    *}*    
1. At the command prompt, create the ToDosTable by executing:  
    *aws dynamodb create-table --cli-input-json file://json/create-todos-table.json --endpoint-url http://localhost:8000*  
      
      **Note:** If you misconfigured your table and need to delete it, you may do so by executing the following command:  
        *aws dynamodb delete-table --table-name ToDosTable --endpoint-url http://localhost:8000*  
1. At the command prompt, start the local API Gateway instance by executing:  
    *sam local start-api --env-vars json/env.json --docker-network sam-demo-net*  

### Testing the application
1. Insert a ToDo item in the table by executing the following CURL command at the prompt:  
   *curl -X POST -d '{"title": "test ToDo"}' http://127.0.0.1:3000/todos*  

1. Let's retrieve ToDo items from the local DynamoDB instance by executing the following CURL command at the prompt:  
    *curl http://127.0.0.1:3000/todos*  

1. To update ToDo item, run this command:

*curl -X PUT -d '{"title": "test ToDo (completed)", "isCompleted": true}' http://127.0.0.1:3000/todos/UUID*  

Note: replace `UUID` with real item id. 