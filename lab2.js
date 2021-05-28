// 1
db.people.aggregate([
    { $group: {
        _id:null,
        averageAge: { $avg: "$age" }
    }}
]);
// 2
db.people.aggregate([
    { $group: {
        _id: "$gender",
        averageAge: { $avg: "$age" }
    }}
]);
// 3
db.people.aggregate([
    { $group: {
        _id: "$gender",
        count: { $sum: 1 } 
    }}
]);
// 4
db.people.aggregate([
    { $sort: {age:-1} },
    { $limit: 3 }
])
// 5
db.people.aggregate([
    { $sort: {age:1} },
    { $limit: 5 },
    { $project: {
        _id: false,
        name: {$concat: ["$first_name", " ", "$last_name"] },
        age: "$age"
        
    }}
])
// 6
db.people.aggregate([
    {$group: {
        _id: null,
        avgChildren: {$avg: {$size: "$children"}}
    }}
])
// 7
db.people.aggregate([
    {$match: {state:"Michigan"}},
    {$unwind: "$children"},
    {$match: {"children.age": {$lt: 10}}},
    {$project: {
        _id: false,
        name: "$children.name",
        age: "$children.age"
    }}
])

// 8
db.people.aggregate([
    {$unwind: "$children"},
    {$group: {
        _id: "$state",
        avgAge: {$avg: "$children.age"}
    }},
    {$sort: {avgAge: -1}}
])

// 9
db.orders.aggregate([
    { $group: {
        _id: null,
        totalAll: {$sum: "$total"}
    } }
])
// 10
db.orders.aggregate([
    { $match: {date: "2017-05-22"}},
    { $group: { 
        _id: null,
        totalDay: {$sum: "$total"}
    }}
])
// 11
db.orders.aggregate([
    { $group: { 
        _id: "$date",
        count: {$sum: 1}
    }},
    { $sort: {count:-1} },
    { $limit: 1 },
    { $project: {
        date: "$_id",
        orders: "$count",
        _id: 0
    }}
])
// 12
db.orders.aggregate([
    { $group: { 
        _id: "$date",
        totalDay: {$sum: "$total"}
    }},
    { $sort: {totalDay:-1} },
    { $limit: 1 },
    { $project: {
        date: "$_id",
        totalDay: "$totalDay",
        _id: 0
    }}
])

// 13
db.orders.aggregate([
    {$unwind: "$items"},
    {$group: {
        _id: "$items.product",
        totalSold: {$sum: "$items.count"}
    }},
    {$sort: {totalSold: -1}},
    {$limit: 3}
])

// 14
db.orders.aggregate([
    {$unwind: "$items"},
    {$group: {
        _id: "$items.product",
        revenue: {$sum: {$multiply: ["$items.count", "$items.price"]}}, 
    }},   
    {$sort: {revenue: -1}} ,
    {$limit: 1}
])

