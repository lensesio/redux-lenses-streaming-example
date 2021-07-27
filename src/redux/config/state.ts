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

