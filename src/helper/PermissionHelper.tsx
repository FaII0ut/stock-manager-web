import store from "@/store";

export const checkPermissions = (permission: string) => {
  const {email} = store.getState().user.user;
  console.log(email);

  if (!email) {
    return false;
  }
  const permissions: any = {
    "@admin.com": [
      "view-staff",
      "edit-staff",
      "delete-staff",
      "add-staff",
      "view-inventory",
      "edit-inventory",
      "delete-inventory",
      "add-inventory",
      "view-distributions",
      "edit-distributions",
      "delete-distributions",
      "add-distributions",
      "settings"
    ],
    "@stock.com": [
      "view-inventory",
      "edit-inventory",
      "delete-inventory",
      "add-inventory",
    ],
    "@manager.com": [
      "view-staff",
      "edit-staff",
      "delete-staff",
      "add-staff",
      "view-inventory",
      "edit-inventory",
      "delete-inventory",
      "add-inventory",
      "view-distributions",
      "edit-distributions",
      "delete-distributions",
      "add-distributions",
    ],
    "@view.com": ["view-staff", "view-inventory", "view-distributions"],
  };

  // Extract the domain from the email
  const domain = email.substring(email.indexOf("@"));

  // Check if the domain exists in the permissions object
  if (permissions[domain]) {
    return permissions[domain].includes(permission);
  }

  // If no matching domain, deny by default
  return false;
};
