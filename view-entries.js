let data = {
    "entries": [ 
            {   "date": "2021-01-01",
            "activities": {"exercise": true, "social": true, "hygiene": true, "cleanliness": true, "healthy": false, "nature": true},
            "emotions": ["happy", "grateful", "loved"],
            "reflection": "i feel good today!" ,
            "num_pos_emotions": 3,
            "num_neg_emotions": 0 }, 
            {   "date": "2021-01-02",
            "activities": {"exercise": false, "social": false, "hygiene": true, "cleanliness": true, "healthy": true, "nature": true},
            "emotions": ["sad", "empty", "depressed"],
            "reflection": "i feel bad today :(",
            "num_pos_emotions": 0,
            "num_neg_emotions": 3 
            },
            {   "date": "2021-01-03",
            "activities": {"exercise": false, "social": false, "hygiene": true, "cleanliness": false, "healthy": false, "nature": true},
            "emotions": ["meh"],
            "reflection": "i feel okay",
            "num_pos_emotions": 0,
            "num_neg_emotions": 0 
            }
    ]
};

console.log(data);
