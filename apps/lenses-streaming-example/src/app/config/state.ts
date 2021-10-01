// Feel free to improve on the types, based on what the server is sending back
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Message = any;

export type SessionState = {
    heartbeatCount: number;
    messages: Message[];
    host: string;
    user: string;
    password: string;
    message?: Message;
}

export type State = {
    session: SessionState;
}

