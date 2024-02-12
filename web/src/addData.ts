import { dynamoDB } from './main.tsx';



export function addUser(username: string, email: string, password: string, first_name: string, last_name: string,
    date_of_birth: string, created_at: string, updated_at: string, status: string) {

    const params = {
        TableName: "users",
        Item: {
            id: { N: "1" },
            username: { S: username },
            email: { S: email },
            password: { S: password },
            first_name: { S: first_name },
            last_name: { S: last_name },
            date_of_birth: { S: date_of_birth },
            created_at: { S: created_at },
            updated_at: { S: updated_at },
            status: { S: status },
        }
    };

    dynamoDB.putItem(params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

export function addUser_roles(user_id: number, role: string, created_at: string, updated_at: string) {
    const params = {
        TableName: "user_roles",
        Item: {
            user_id: { N: String(user_id) },
            role: { S: role },
            created_at: { S: created_at },
            updated_at: { S: updated_at },
        }
    };

    dynamoDB.putItem(params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

export function addRoles(id: number, name: string, description: string, created_at: string, updated_at: string){
    const params = {
        TableName: "roles",
        Item: {
            id: { N: String(id) },
            name: { S: name },
            description: { S: description },
            created_at: { S: created_at },
            updated_at: { S: updated_at },
        }
    };

    dynamoDB.putItem(params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}


export function addClient(phone: number, contact_email: string, adress: string, industry: string, name: string) {

    const params = {
        TableName: "clients",
        Item: {
            id: { N: "1" },
            phone: { S: String(phone) },
            contact_email: { S: contact_email },
            adress: { S: adress },
            industry: { S: industry },
            name: { S: name },
        }
    };

    dynamoDB.putItem(params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}


export function addClient_members(client_id: number, user_id: number, role: string, joined_date: Date, primary: string) {
    const param = {
        TableName: "client_members",
        Item: {
            client_id: { N: String(client_id) },
            user_id: { N: String(user_id) },
            role: { S: role },
            joined_date: { S: joined_date.toISOString() },
            primary: { S: primary },
        }
    };

    dynamoDB.putItem(param, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

export function addProjects(client_id: number, name: string, description: string, start_date: Date, end_date: Date, status: string) {
    const param = {
        TableName: "projects",
        Item: {
            client_id: { N: String(client_id) },
            name: { S: name },
            description: { S: description },
            start_date: { S: start_date.toISOString() },
            end_date: { S: end_date.toISOString() },
            status: { S: status },
        }
    };

    dynamoDB.putItem(param, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

export function addProject_members(project_id: number, user_id: number, role: string, joined_date: Date, primary: string) {
    const param = {
        TableName: "project_members",
        Item: {
            project_id: { N: String(project_id) },
            user_id: { N: String(user_id) },
            role: { S: role },
            joined_date: { S: joined_date.toISOString() },
            primary: { S: primary },
        }
    };

    dynamoDB.putItem(param, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

export function addInvoices(id: number, project_id: number, amount: number, issued_date: Date, due_date: Date, status: string){
    const param = {
        TableName: "invoices",
        Item: {
            id: { N: String(id) },
            project_id: { N: String(project_id) },
            amount: { N: String(amount) },
            issued_date: { S: String(issued_date) },
            due_date: { S: String(due_date) },
            status: { S: status },
        }
    };

    dynamoDB.putItem(param, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    }); 
}

export function addInvoice_line_items(id:number, invoice_id: number, description: string, quantity: number, price: number){
    const param = {
        TableName: "invoice_line_items",
        Item: {
            id: { N: String(id) },
            invoice_id: { N: String(invoice_id) },
            description: { S: description },
            quantity: { N: String(quantity) },
            price: { N: String(price) },
        }
    };

    dynamoDB.putItem(param, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    }); 
}

export function addPayments(id: number, invoice_id: number, amount: number, fee: number, net: number, status: string, transfer_destinstion: string, transfer: string, description: string){
    const param = {
        TableName: "payments",
        Item: {
            id: { N: String(id) },
            invoice_id: { N: String(invoice_id) },
            amount: { N: String(amount) },
            fee: { N: String(fee) },
            net: { N: String(net) },
            status: { S: status },
            transfer_destinstion: { S: transfer_destinstion },
            transfer: { S: transfer },
            description: { S: description },
            
        }
    };

    dynamoDB.putItem(param, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    }); 
}

