const { EmbedBuilder, ActionRowBuilder } = require('discord.js');

const isButtonForUser = (returnValue, ...interaction) => {
	if (returnValue.user.id === interaction.user.id) return true;
	return returnValue.reply({
		embeds: [
			new MessageEmbed()
				.setColor("Red")
				.setDescription("This Button Isn't For You")
		],
		ephemeral: true
	});
};

const isSelectMenuForUser = (returnValue, ...interaction) => {
	return returnValue.user.id === interaction.user.id && returnValue.isSelectMenu();
};

/**
 * retro compatibility for v13
 */
class MessageEmbed extends EmbedBuilder {
	addField(name, value) {
		this.addFields({ name, value });
		return this;
	}

	getButtons = (pageNo, maxPages) => {
		return new ActionRowBuilder().addComponents(
			new MessageButton()
				.setCustomId("previous_page")
				.setEmoji("◀️")
				.setStyle("PRIMARY")
				.setDisabled(pageNo == 0),
			new MessageButton()
				.setCustomId("next_page")
				.setEmoji("▶️")
				.setStyle("PRIMARY")
				.setDisabled(pageNo == (maxPages - 1)),
		);
	};
}

module.exports = { MessageEmbed,
	isButtonForUser, isSelectMenuForUser };