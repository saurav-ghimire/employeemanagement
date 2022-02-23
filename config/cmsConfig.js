
let config = {};
config.modules = {
    "dashboard": "Dashboard",
    "roles": "Roles",
    "admins": "Admins",
    "users": "Users",
    "departments": "departments",
    "designations": "designations",
    "employees": "employees"
};
config.modulePages = {
    "roles": {
        "roles": "Roles"
    },
    "admins": {
        "admins": "Admins"
    },
    "users": {
        "users": "Users"
    },
    "departments": {
        "departments": "departments"
    },
    "designations": {
        "designations": "designations"
    },
    "employees": {
        "employees": "employees"
    }
};

config.modulePermissions = {
    "roles": {
        "roles.view": "View Roles",
        "roles.create": "Create Roles",
        "roles.edit": "Edit Roles",
        "roles.delete": "Delete Roles"
    },
    "admins": {
        "admins.view": "View Admins",
        "admins.create": "Create Admins",
        "admins.edit": "Edit Admins",
        "admins.delete": "Delete Admins"
    },
    "users": {
        "users.view": "View Users",
        "users.create": "Create Users",
        "users.edit": "Edit Users",
        "users.delete": "Delete Users"
    },
    "designations": {
        "designations.view": "View designations",
        "designations.create": "Create designations",
        "designations.edit": "Edit designations",
        "designations.delete": "Delete designations"
    },
    "employees": {
        "employees.view": "View employees",
        "employees.create": "Create employees",
        "employees.edit": "Edit employees",
        "employees.delete": "Delete employees"
    },
    "deparatments": {
        "deparatments.view": "View deparatments",
        "deparatments.create": "Create deparatments",
        "deparatments.edit": "Edit deparatments",
        "deparatments.delete": "Delete deparatments"
    }
};
config.moduleIcons = {
    "dashboard": "icon-grid",
    "roles": "icon-grid",
    "admins": "icon-grid",
    "users": "icon-grid",
    "departments": "icon-grid",
    "designations": "icon-grid",
    "employees": "icon-grid"
};
module.exports = config;