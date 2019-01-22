const path = require('path');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
const { getTrelloCards } = require(`./fetchTrello`);
const { addLocalImage } = require(`./addLocalImage`);
exports.sourceNodes = async (
  { actions: { createNode }, store, cache, createContentDigest },
  configOptions
) => {
  const data = await getTrelloCards(configOptions);
  try {
    await Promise.all(
      data.map(async card => {
        const cardNode = Object.assign(
          {
            parent: `__SOURCE__`,
            children: [],
            internal: {
              type: `TrelloCard`,
              content: card.content,
              mediaType: `text/markdown`
            }
          },
          card
        );
        cardNode.internal.contentDigest = createContentDigest(cardNode);
        createNode(cardNode);

        if (cardNode.image_url) {
          await addLocalImage(
            { actions: { createNode }, store, cache },
            cardNode
          );
        }
        return;
      })
    );
  } catch (error) {
    console.log(`ERROR while creating nodes : ${error}`);
  }
};

exports.onCreateWebpackConfig = ({
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      plugins: [new DirectoryNamedWebpackPlugin()],
    },
  });
};

