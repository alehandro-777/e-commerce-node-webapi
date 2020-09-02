//#region
/*
Projection:
GET /users/123?fields=username,email (for one specific user)
GET /users?fields=username,email (for a full list of users)

Filtering:
GET /users?country=USA
GET /users?creation_date=2019-11-11
GET /users?creation_date=2019-11-11

Sorting:
GET /users?sort=birthdate_date:asc
GET /users?sort=birthdate_date:desc

Paging:
GET /users?per_page=100
GET /users?page=2

All together:
http://localhost:3000/?country=USA&creation_date=2019-11-11&sort=birthdate_date:desc&page=3&per_page=20

*/

//{ name: /john/i }, 'name friends', { limit:1, skip: 10, sort: {date: 1(ASC or -1 DESC)} } 
//#endregion