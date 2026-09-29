export interface Credentials {
  idInstance: string;
  apiTokenInstance: string;
}

export type ChatType = 'user' | 'group' | 'supergroup' | 'channel' | 'bot';

export interface ChatItem {
  chatId: string;
  name: string;
  type: ChatType;
  phoneNumber: number;
  username?: string;
}

export interface ChatHistoryMessage {
  type: 'incoming' | 'outgoing';
  idMessage: string;
  timestamp: number;
  typeMessage: string;
  chatId: string;
  chatType?: ChatType;
  statusMessage?: 'delivered' | 'read';
  sendByApi?: boolean;
  senderName?: string;
  textMessage?: string;
  downloadUrl?: string;
  caption?: string;
  mimeType?: string;
}

export interface SendMessageResponse {
  idMessage: string;
}

export interface AddContactResponse {
  addContact: boolean;
}

export interface WebhookBody {
  typeWebhook: string;
  idMessage?: string;
  timestamp: number;
  senderData?: {
    chatId: string;
    sender?: string;
    senderName?: string;
    senderPhoneNumber?: number;
  };
  messageData?: {
    typeMessage: string;
    textMessageData?: {
      textMessage: string;
    };
  };
}

export interface Notification {
  receiptId: number;
  body: WebhookBody;
}
