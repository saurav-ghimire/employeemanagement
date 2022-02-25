
let config = {};
config.modules = {
    "dashboard": "Dashboard",
    "roles": "Roles",

};
config.modulePages = {
    "roles": {
        "roles": "Roles"
    },

};

config.modulePermissions = {
    "roles": {
        "roles.view": "View Roles",
        "roles.create": "Create Roles",
        "roles.edit": "Edit Roles",
        "roles.delete": "Delete Roles"
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