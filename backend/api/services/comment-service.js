import Comment from "../models/comment.js";

// save fn to save a comment 
export const save = async (newComment) => {
    let comment = new Comment(newComment);
    return comment.save();
}

// fn to fetch all comments
export const getAll = async () => {
    return Comment.find();
}
// fn to update the comment by id
export const update = async (id, updatedComment) => {
    // Check if the updatedAt field is present and if it is not a valid date
    if (updatedComment.updatedAt && isNaN(Date.parse(updatedComment.updatedAt))) {
        throw new Error('Invalid date format for updatedAt field');
    }

    // Set updatedAt field to the current date if it is not already set
    if (!updatedComment.updatedAt) {
        updatedComment.updatedAt = new Date();
    }

    try {
        // Use the Mongoose 'findByIdAndUpdate' method to update the document
        // 'new: true' returns the modified document, 'runValidators: true' applies validation rules on update
        const updatedDoc = await Comment.findByIdAndUpdate(id, updatedComment, { new: true, runValidators: true }).exec();
        return updatedDoc;
    } catch (err) {
        // Handle any errors that occur during the update process
        throw new Error(`Error updating comment: ${err.message}`);
    }
}


// fn to remove comments by id
export const remove = async (id) => {
    return Comment.findByIdAndRemove(id);
}

// fn to get a comment by id
export const getById = async (id) => {
    return Comment.findById(id);
}