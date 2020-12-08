/*
 * Created by Jimmy Lan
 * Creation Date: 2020-12-03
 */

import { AccountSignUp, Subjects, MsgReceiver } from "@ly-letitfly/common";
import { Message } from "node-nats-streaming";
import { queueGroup } from "./constants";
import { User } from "../../models";

export class AccountSignUpMsgReceiver extends MsgReceiver<AccountSignUp> {
  subject: Subjects.AccountSignUp = Subjects.AccountSignUp;
  queueGroup = queueGroup;

  async onMessage(data: AccountSignUp["data"], msg: Message) {
    const { id, email } = data;

    console.log("Message Received: ", id, email);

    const user = User.build({
      id,
      contact: { email: { primary: email } },
    });

    await user.save();

    msg.ack();
  }
}
