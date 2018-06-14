// Message type for integration
/*
Command-Message:- The purpose of this type of message is to trigger the
                  execution of an action or a task on the receiver.
                  can be used to implement RPC systems.
                  Restful HTTP calls are simple examples of command pattern

Event Message:- used to notify another component that something has occured.
                it contains the type of event and sometimes also details such as the context, the subject or the actors involved.
                In web dev, we used event message in the browser when using long-polling or Websockets.
Document Message:- Transfer data b/w components and machines.
                  Dif from command - The message does not contain any info that tell receiver what to do with data
                  Dif from Event - Absence of association with the particular occurrence
*/