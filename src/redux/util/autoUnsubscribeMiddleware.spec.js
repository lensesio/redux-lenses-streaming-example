import autoUnsubscribeMiddleware from './autoUnsubscribeMiddleware';

const dispatch = jest.fn();
const getState = jest.fn();
const next = jest.fn();

const store = {dispatch, getState};

afterEach(jest.clearAllMocks);

describe('autoUnsubscribeMiddleware', () => {
	it('will unsubscribe when messages are exactly 15k', () => {
		getState.mockReturnValue({
			session: {
				messages: new Array(15000)
			},
			lenses: {
				subscriptions: ['topic-1', 'topic-2']
			}
		});

		autoUnsubscribeMiddleware(store)(next)({type: 'whatever'});

    expect(dispatch).toHaveBeenCalledWith({
    	"request": {
    		"correlationId": expect.any(Number), 
    		"topics": ["topic-1", "topic-2"]},
    		"type": "@@redux-lenses-streaming/UNSUBSCRIBE"
    	});
	});

  it('will unsubscribe when messages are over 15k', () => {
    getState.mockReturnValue({
      session: {
        messages: new Array(16000)
      },
      lenses: {
        subscriptions: ['topic-1', 'topic-2']
      }
    });

    autoUnsubscribeMiddleware(store)(next)({type: 'whatever'});

    expect(dispatch).toHaveBeenCalledWith({
      "request": {
        "correlationId": expect.any(Number), 
        "topics": ["topic-1", "topic-2"]},
        "type": "@@redux-lenses-streaming/UNSUBSCRIBE"
      });
  });

  it('will not unsubscribe when messages are under 15k', () => {
    getState.mockReturnValue({
      session: {
        messages: new Array(14999)
      },
      lenses: {
        subscriptions: ['topic-1', 'topic-2']
      }
    });

    autoUnsubscribeMiddleware(store)(next)({type: 'whatever'});

    expect(dispatch).not.toHaveBeenCalled()
  });
});
