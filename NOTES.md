Change the application such that it unsubscribes automatically after 15000 messages received from the server.

* Since this feature does not seem to be bound to view (specs state application wide), a redux middleware has been implemented.
* At any given point, if a dispatch happens and the number of messages are equal or over 15k in total, the middleware dispatches an action to trigger unsubscription from all active subscriptions.
 