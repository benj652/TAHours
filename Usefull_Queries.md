# Usefull Queries

Some usefull queries for managing the DB

## Update your role

This will always be needed, as there is no way to become an admin with the current UI.

```json
db.users.updateOne({ email: 'bmjaff26@colby.edu' },{ $set: { roles: 'admin'}});
```

## Insert a class

```
db.cs_classes.insertOne({ name: "CS101", activeQueue: ObjectId(), queues: [], isActive: true, semester: "Spring", year:1984});
```
