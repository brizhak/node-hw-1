import yargs from "yargs";
import { program } from "commander";
import * as contactsOptions from "./contacts.js";

const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        const contactsList = await contactsOptions.listContacts();
        return console.log(contactsList);
      case "get":
        const contactById = await contactsOptions.getContactById(id);
        return console.log(contactById);
      case "add":
        const newContact = await contactsOptions.addContact(name, email, phone);
        return console.log(newContact);

      case "remove":
        const removedContact = await contactsOptions.removeContact(id);
        return console.log(removedContact);

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (e) {
    console.log(e.message);
  }
};

// ----------------------------------------------------------------

// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "e6ywwRe4jcqxXfCZOj_1e" });
// await invokeAction({
//   action: "add",
//   name: "Victor",
//   email: "victor@gmail.com",
//   phone: "+11111111111",
// });
// invokeAction({ action: "remove", id: "rsKkOQUi80UsgVPCcLZZW" });

// ----------------------------------------------------------------

// const { argv } = yargs(process.argv);
// invokeAction(argv);

// ----------------------------------------------------------------

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();
invokeAction(options);
