const axios = require("axios");
const slugify = require("slugify");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

const options = {
  key: `${process.env.KEY}`,
  token: `${process.env.TOKEN}`,
  board_id: `${process.env.BOARD_ID}`
}
exports.getTrelloCards = async () => {
  const getData = (e, eId, params) =>
    axios.get(
      `https://api.trello.com/1/${e}/${eId}?${params}&key=${options.key}&token=${options.token}`
    );
  const results = [];
  try {
    const { data: lists } = await getData(
      `boards`,
      `${options.board_id}/lists`,
      `lists=all&fields=id,name`
    );
    await Promise.all(
      lists.map(async (list, i) => {
        const { data: cards } = await getData(
          `list`,
          `${list.id}/cards`,
          `fields=id,name`
        );

        await Promise.all(
          cards.map(async (card, e) => {
            const { data } = await getData(
              `cards`,
              `${card.id}`,
              `fields=id,name,desc&attachments=true&attachment_fields=url`
            );

            results.push({
              list_index: i,
              list_id: list.id,
              list_slug: slugify(list.name, "_"),
              list_name: list.name,
              index: e,
              id: data.id,
              slug: slugify(data.name, "_"),
              name: data.name,
              image_url: data.attachments[0]
                ? data.attachments[0].url
                : null,
              content: data.desc
            });
          })
        );
      })
    );
    return results;
  } catch (error) {
    console.log(`ERROR while fetching cards : ${error}`);
  }
};

