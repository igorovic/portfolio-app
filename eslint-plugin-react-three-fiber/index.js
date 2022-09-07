module.exports = {
  rules: {
    "async-func-name": {
      create: function (context) {
        console.log("eslint context", context)
        return {
          JSXAttribute(node) {
            console.log("jsx node", node)
          }
          /* FunctionDeclaration(node) {
            if (node.async && !/Async$/.test(node.id.name)) {
              context.report({
                node,
                message: "Async function name must end in 'Async'"
              });
            }
          } */
        }
      }
    }
  }
};