function d20plusBackgrounds () {
	d20plus.backgrounds = {};

	d20plus.backgrounds.button = function (forcePlayer) {
		const playerMode = forcePlayer || !window.is_gm;
		const url = playerMode ? $("#import-backgrounds-url-player").val() : $("#import-backgrounds-url").val();
		if (url && url.trim()) {
			const handoutBuilder = playerMode ? d20plus.backgrounds.playerImportBuilder : d20plus.backgrounds.handoutBuilder;

			DataUtil.loadJSON(url).then((data) => {
				d20plus.importer.addBrewMeta(data._meta);
				d20plus.importer.showImportList(
					"background",
					data.background,
					handoutBuilder,
					{
						forcePlayer,
					},
				);
			});
		}
	};

	d20plus.backgrounds.handoutBuilder = function (data, overwrite, inJournals, folderName, saveIdsTo, options) {
		// make dir
		const folder = d20plus.journal.makeDirTree(`Backgrounds`, folderName);
		const path = ["Backgrounds", ...folderName, data.name];

		// handle duplicates/overwrites
		if (!d20plus.importer._checkHandleDuplicate(path, overwrite)) return;

		const name = data.name;
		d20.Campaign.handouts.create({
			name: name,
			tags: d20plus.importer.getTagString([
				Parser.sourceJsonToFull(data.source),
			], "background"),
		}, {
			success: function (handout) {
				if (saveIdsTo) saveIdsTo[UrlUtil.URL_TO_HASH_BUILDER[UrlUtil.PG_BACKGROUNDS](data)] = {name: data.name, source: data.source, type: "handout", roll20Id: handout.id};

				const [noteContents, gmNotes] = d20plus.backgrounds._getHandoutData(data);

				handout.updateBlobs({notes: noteContents, gmnotes: gmNotes});
				handout.save({notes: (new Date()).getTime(), inplayerjournals: inJournals});
				d20.journal.addItemToFolderStructure(handout.id, folder.id);
			},
		});
	};

	d20plus.backgrounds.playerImportBuilder = function (data) {
		const [notecontents, gmnotes] = d20plus.backgrounds._getHandoutData(data);

		const importId = d20plus.ut.generateRowId();
		d20plus.importer.storePlayerImport(importId, JSON.parse(gmnotes));
		d20plus.importer.makePlayerDraggable(importId, data.name);
	};

	d20plus.backgrounds._getHandoutData = function (data) {
		const renderer = new Renderer();
		renderer.setBaseUrl(BASE_SITE_URL);

		const renderStack = [];

		renderer.recursiveRender({entries: data.entries}, renderStack, {depth: 1});

		const rendered = renderStack.join("");

		const r20json = {
			"name": data.name,
			"Vetoolscontent": data,
			"data": {
				"Category": "Backgrounds",
			},
		};
		const gmNotes = JSON.stringify(r20json);
		const noteContents = `${rendered}\n\n<del class="hidden">${gmNotes}</del>`;

		return [noteContents, gmNotes];
	};

	// The popup menu for choosing traits, ideals, bonds and flaws
	// Needs to be its own thing due to having a choose randomly button
	d20plus.backgrounds.traitMenu = async function (ptrait, ideal, bond, flaw) {
		// Arguments to send
		const ptraitargs = {
			countMin: 0,
			countMax: 2,
		}
		const args = {
			countMin: 0,
			countMax: 1,
		}

		// Call the menu
		const pt = await d20plus.ui.chooseCheckboxList(ptrait, "Personality Trait", ptraitargs);
		const id = await d20plus.ui.chooseCheckboxList(ideal, "Ideal", args);
		const bd = await d20plus.ui.chooseCheckboxList(bond, "Bond", args);
		const fl = await d20plus.ui.chooseCheckboxList(flaw, "Flaw", args);

		// Return
		return {
			"personalityTraits": pt,
			"ideals": id,
			"bonds": bd,
			"flaws": fl,
		}
	};
}

SCRIPT_EXTENSIONS.push(d20plusBackgrounds);
