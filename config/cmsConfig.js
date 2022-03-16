
let config = {};
config.modules = {
    "dashboard": "Dashboard",
    "roles": "Roles",
    "departments": "Departments",
    "designation": "Designation",
    "employees": "Employees",
    "users": "users",
};
config.modulePages = {
    "dashboard": {
        "dashboard": "dashboard"
    },
    "roles": {
        "roles": "roles"
    },
    "departments": {
        "departments": "departments"
    },
    "designation": {
        "designation": "designation"
    },
    "employees": {
        "employees": "employees"
    },
    "users": {
        "users": "users"
    },

};

config.modulePermissions = {
    "roles": {
        "roles.view": "View roles",
        "roles.create": "Create roles",
        "roles.edit": "Edit roles",
        "roles.delete": "Delete roles"
    },
    "departments": {
        "departments.view": "View Department",
        "departments.create": "Create Department",
        "departments.edit": "Edit Department",
        "departments.delete": "Delete Department"
    },
    "designation": {
        "designation.view": "View Designation",
        "designation.create": "Create Designation",
        "designation.edit": "Edit Designation",
        "designation.delete": "Delete Designation"
    },
    "employees": {
        "employees.view": "View employees",
        "employees.create": "Create employees",
        "employees.edit": "Edit employees",
        "employees.delete": "Delete employees"
    },
    "users": {
        "users.view": "View users",
        "users.create": "Create users",
        "users.edit": "Edit users",
        "users.delete": "Delete users"
    },
};
config.moduleIcons = {
    "dashboard": "icon-grid",
    "roles": "icon-grid",
    "admins": "icon-grid",
    "users": "icon-grid",
    "departments": "icon-grid",
    "designation": "icon-grid",
    "employees": "icon-grid"
};
module.exports = config;