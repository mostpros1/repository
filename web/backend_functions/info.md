## How to use the backend functions

Here are all the functions i have writen and hpow to use them.


## Adding a user

the addUser() function has the followind parameters whith the following types,


- username: string
- email: string
- password: string
- first_name: string
- last_name: string

these corospond to fields in the database table users


## Adding User Roles

function addUser_roles takes the following parameters,

- user_id: number
- role: string
- created_at: string
- updated_at: string

these corospond to fields in the database table user_roles

## Adding Roles

roles is were you define each user role.

addRoles() takes the following paramerters,

-id: number
- name: string
- description: string
- created_at: string
- updated_at: string

this corosponds to the felds in the database table roles.


## Adding a client

In order to add a client you use the addClient function.

addClient() takes the following parameters


- phone: number
- contact_email: string
- adress: string
- industry: string
- name: string

these corospond to the database table clients.

## Adding client members

the function addClient_members is usede to add to the table client members. it takes the following parameters,


- client_id: number
- user_id: number
- role: string
- joined_date: Date
- primary: string

these corospond to the fields of table client_members.


## Adding projects

The function addProjects() is sed to add information about a project to the database. It takes the following parameters,


- client_id: number
- name: string
- description: string
- start_date: Date
- end_date: Date
- status: string

these corospond to the fields in the database table projects.

## Adding project members

the function addProject_members() is used to asign members to a project. it takes the following parameters

- project_id: number
- user_id: number
- role: string
- joined_date: Date
- primary: string

this is used to add aall members to the table project_members.


## Creating invoices

To create an invoice you use the function addInvoices().
addInvoices takes the following parameters.



- id: number
- project_id: number
- amount: number
- issued_date: Date
- due_date: Date
- status: string

this then stores the invoice in tha databse table invoices.


## Adding invloice line items

invoice line items are the items that you have orderd. As an example, if you orderd 2 radiators, then thoes would be your invoice line items.

to add invoice line items you would use the function 