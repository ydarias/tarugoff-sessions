for (let i = 1; i < 12; i++) {
    const votes = db.Tweets.find({
        text: { $regex: `.*#charlaca${i}[^0-9].*`, $options: 'i' }
    }).count();

    db.Sessions.update(
        { sessionId: i },
        {
            sessionId: i,
            votes
        },
        {
            upsert: true

        });
}
