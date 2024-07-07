function minWordCountValidator(minimumWords) {
    return function (value) {
        const wordCount = value.trim().split(/\s+/).length;
        return wordCount >= minimumWords;
    };
}

module.exports = {
    minWordCountValidator,
};
