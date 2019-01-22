const { createRemoteFileNode } = require(`gatsby-source-filesystem`);

exports.addLocalImage = async (
  { actions: { createNode }, store, cache },
  datum
) => {
  try {
    const imageExt = datum.image_url.split(".").pop();
    const imageNode = await createRemoteFileNode({
      url: datum.image_url,
      cache,
      store,
      createNode,
      createNodeId: () => `image-${datum.id}`,
      ext: `.${imageExt}`
    });
    datum.image___NODE = imageNode.id;
  } catch (error) {
    console.log(`ERROR while remoting image : ${error}`);
  }
};
