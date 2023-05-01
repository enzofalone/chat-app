export type Channel = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  _id?: string;
  username?: string;
  picture?: string;
  googleId?: string;
};

export type Server = {
  createdAt: string;
  id: string;
  name?: string;
  channels: Channel[];
};

export type Message = {
  createdAt: string;
  id: string | number | undefined;
  user?: User;
  name?: string;
  text: string;
  channelId: string | undefined;
  status?: MessageStatus;
  success?: boolean;
};

// To know what is the state of the message
export enum MessageStatus {
  PENDING,
  ERROR,
  DELIVERED,
}