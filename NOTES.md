Change the application such that it unsubscribes automatically after 15000 messages received from the server.

* Since this feature does not seem to be bound to view (specs state application wide), a redux middleware has been implemented.
* At any given point, if a dispatch happens and the number of messages are equal or over 15k in total, the middleware dispatches an action to trigger unsubscription from all active subscriptions.


Add a secondary way to view the data, in a chart(free to choose from any lib). The user should be able to tab between the 2 views, the existing list and the chart. (use bulma's tabs to achieve this). The subscribe panel should be visible in any of the views.

* Tabbed interface has been implmeneted with a react hook.
* The hook is responsible for maintaining the tab state.
* It's kept to a miminum solution, mostly because tabbed interfaces have a lot moving parts and contexts to implement.
* The chart are implemented with recharts library. It is meant to visualize the number of packets per minute.
