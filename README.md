# footballi_backend_challenge

you need nodejs and npm to run this application.
after installing node and npm, you have to install its dependecies by the following command `npm install`, then you can run the application using `npm start`.

## How to use Apis

* getting user's all starred repositories:
    * GET /api/v1/{username}/starred

* searching user's repositories by tag:
    * GET /api/v1/{username}/starred?tag=XXX

* getting tags of a particular user's repository:
    * GET /api/v1/{username}/starred/{repositoryId}/tags

* adding tags to a particular user's repository:
    * POST /api/v1/{username}/starred/{repositoryId}/tags
    * body:{tag:XXX}

* deleting all tags of a particular user's repository:
    * DELETE /api/v1/{username}/starred/{repositoryId}/tags

* deleting a tag of a particular user's repository:
    * DELETE /api/v1/{username}/starred/{repositoryId}/tags/{tag}



