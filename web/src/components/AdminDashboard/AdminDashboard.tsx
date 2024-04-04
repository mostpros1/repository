import React from 'react';
import './AdminDashboard.css';

function AdminDashboard() {
    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h1>Admin Dashboard</h1>
            </div>
            <div className="admin-tabs">
                <div className="admin-tab">
                    <h2>Home Owners</h2>
                    <p>View and manage home owner accounts</p>
                </div>
                <div className="admin-tab">
                    <h2>Professionals</h2>
                    <p>View and manage professional accounts</p>
                </div>
                <div className="admin-tab">
                    <h2>Jobs</h2>
                    <p>View and manage job postings</p>
                </div>
                <div className="admin-tab">
                    <h2>Payments</h2>
                    <p>View and manage payments</p>
                </div>
                <div className="admin-tab">
                    <h2>Manage Users</h2>
                    <p>View and manage all users</p>
                </div>
                <div className="admin-tab">
                    <h2>Manage Providers</h2>
                    <p>View and manage all service providers</p>
                </div>
            </div>
            <div className="admin-table">
                <h2>Table 1</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Table 1 data rows */}
                    </tbody>
                </table>
            </div>
            <div className="admin-table">
                <h2>Table 2</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Table 2 data rows */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminDashboard;
