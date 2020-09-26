db.Tweets.aggregate([
    {
        $group: {
            _id: { id: "$id" },
            duplicates: { $addToSet: "$_id" },
            count: { $sum: 1 }
        }
    },
    {
        $match:
            {
                count: { $gt: 1 }
            }
    }
]).forEach(doc => {
    doc.duplicates.shift();
    db.Tweets.remove({
        _id: {$in: doc.duplicates}
    });
});