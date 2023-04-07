const preventPushToProd = `branch=\`git symbolic-ref HEAD\`
if [ "$branch" = "refs/heads/production" ]; then
    echo "\\033[31mDirect push to production is not allowed.\\033[0m"
    exit 1
fi`;

module.exports = {
  hooks: {
    "pre-push": preventPushToProd
  }
};
