const form = document.querySelector(".form");
const contentElement = document.querySelector("#content");
const messageElement = document.querySelector("#messages");
// import { createClient } from "https://unpkg.com/@supabase/supabase-js";

const client = supabase.createClient(
   "https://dogmyyykikqbcofzldvx.supabase.co",
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvZ215eXlraWtxYmNvZnpsZHZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDkwODQxNDYsImV4cCI6MTk2NDY2MDE0Nn0.0fvMDW7pPmXvOEdQDDB9BXbDtEE11J3jgq20MnYfO2s"
);

const init = async () => {
   const { data: Messages, error } = await client.from("Messages").select("*");
   form.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const message = {
         usernames: formData.get("usernames"),
         content: formData.get("content"),
      };
      contentElement.value = "";

      client
         .from("Messages")
         .insert([message])
         .then(() => {
            console.log("Message sent");
         });
   });

   Messages.forEach(addMessageToPage);
   client
      .from("Messages")
      .on("INSERT", (message) => {
         addMessageToPage(message.new);
         console.log("Message Received!", message);
      })
      .subscribe();
};

const addMessageToPage = (message) => {
   const element = document.createElement("li");
   element.classList.add("card", "m-2");
   element.innerHTML = `<div class="card-body">
   <div class="row">
      <div class="col-sm-2">
         <img
            class="avater"
            src="data:image/jpeg;base64,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"
         />
         <p>${message.usernames}</p>
      </div>

      <div class="col-sm-10">
         <p>
           ${message.content}
         </p>
      </div>
      <div class="row">
         <p>${message.created_id}</p>
      </div>
   </div>
</div>`;
   messageElement.append(element);
   setTimeout(() => {
      element.scrollIntoView({ behavior: "smooth" });
   }, 300);
};

init();
