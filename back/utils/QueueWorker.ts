import Queue from "bull";
import sendEmail from "./EmailHandler";
const emailQueue = new Queue("emailQueue", {
  redis: {
    port: 6379,
    host: "127.0.0.1",
  },
});
emailQueue.process(async (job: any) => {
  console.log(job.data);
  await sendEmail(job.data);
  console.log("email sent successfully");
});

export { emailQueue };
