function initHTMLroll20actionsMenu () {
	d20plus.html = d20plus.html || {};

	d20plus.html.actionsMenu = `
	<script id='tmpl_actions_menu' type='text/html'>
		<div class='actions_menu d20contextmenu'>
			<ul>
				<$ if (Object.keys(this).length === 0) { $>
				<li data-action-type='unlock-tokens'>Unlock...</li>
				<$ } $>
				<$ if(this.view && this.view.graphic.type == "image" && this.get("cardid") !== "") { $>
				<li class='head hasSub' data-action-type='takecard'>Take Card</li>
				<li class='head hasSub' data-action-type='flipcard'>Flip Card</li>
				<li class='head hasSub' data-action-type='removecard'>Remove Card</li>
				<$ } $>
				<$ if(window.is_gm) { $>
				<$ if(this.view && this.get("isdrawing") === false && window.currentEditingLayer != "map") { $>
				<!-- BEGIN MOD -->
				<li class='head hasSub' data-menuname='massroll'>
					Mass Roll &raquo;
					<ul class='submenu' data-menuname='massroll'>
						<li class='head hasSub' data-action-type='rollinit'>Initiative</li>
						<li class='head hasSub' data-action-type='rollsaves'>Save</li>
						<li class='head hasSub' data-action-type='rollskills'>Skill</li>
					</ul>
				</li>
				<!-- END MOD -->
				<li class='head hasSub' data-action-type='addturn'>Add Turn</li>
				<$ } $>
				<!-- BEGIN MOD -->
				<!-- <li class='head'>Edit</li> -->
				<!-- END MOD -->
				<$ if(this.view) { $>
				<li data-action-type='delete'>Delete</li>
				<li data-action-type='copy'>Copy</li>
				<$ } $>
				<li data-action-type='paste'>Paste</li>
				<!-- BEGIN MOD -->
				<$ if(!this.view) { $>
				<li data-action-type='undo'>Undo</li>
				<$ } $>
				<!-- END MOD -->

				<!-- BEGIN MOD -->
				<$ if(this.view) { $>
				<li class='head hasSub' data-menuname='move'>
					Move &raquo;
					<ul class='submenu' data-menuname='move'>
						<li data-action-type='tofront'>To Front</li>
						<li data-action-type='forward-one'>Forward One
							<!-- (B-F)-->
						</li>
						<li data-action-type='back-one'>Back One
							<!-- (B-B)-->
						</li>
						<li data-action-type='toback'>To Back</li>
					</ul>
				</li>
				<$ } $>

				<li class='head hasSub' data-menuname='VeUtil'>
					Utilities &raquo;
					<ul class='submenu' data-menuname='VeUtil'>
						<li data-action-type='util-scenes'>Start Scene</li>
						<$ if(this.get && this.get("type") == "image") { $>
						<div class="ctx__divider"></div>
						<li data-action-type='token-animate'>Animate</li>
						<li data-action-type='token-fly'>Set&nbsp;Flight&nbsp;Height</li>
						<li data-action-type='token-light'>Set&nbsp;Light</li>
						<$ } $>
						<div class="ctx__divider"></div>
						<li data-action-type='ping'>Ping Everyone</li>
						<li data-action-type='focusping'>Focus Ping</li>
					</ul>
				</li>
				<!-- END MOD -->

				<li class='head hasSub' data-menuname='advanced'>
					Advanced &raquo;
					<ul class='submenu' data-menuname='advanced'>
						<li data-action-type='group'>Group</li>
						<li data-action-type='ungroup'>Ungroup</li>
						<$ if(this.get && this.get("type") == "image") { $>
						<li class="<$ if (this && this.get("isdrawing")) { $>active<$ } $>" data-action-type="toggledrawing">Is Drawing</li>
						<li class="<$ if (this && this.get("fliph")) { $>active<$ } $>" data-action-type="togglefliph">Flip Horizontal</li>
						<li class="<$ if (this && this.get("flipv")) { $>active<$ } $>" data-action-type="toggleflipv">Flip Vertical</li>
						<li data-action-type='setdimensions'>Set Dimensions</li>
						<$ if(window.currentEditingLayer == "map") { $>
						<li data-action-type='aligntogrid'>Align to Grid</li>
						<$ } $>
						<$ } $>

						<$ if(this.view) { $>
						<li data-action-type='lock-token'>Lock/Unlock Position</li>
						<$ } $>

						<$ if(this.get && this.get("type") == "image") { $>
						<li data-action-type='copy-tokenid'>View Token ID</li>
						<$ } $>
						<$ if(this.get && this.get("type") == "path") { $>
						<li data-action-type='copy-pathid'>View Path ID</li>
						<$ } $>
					</ul>
				</li>

				<li class='head hasSub' data-menuname='positioning'>
					Layer &raquo;
					<ul class='submenu' data-menuname='positioning'>
						<li data-action-type="tolayer_map" class='<$ if(this && this.get && this.get("layer") == "map") { $>active<$ } $>'><span class="pictos ctx__layer-icon">@</span> Map Layer</li>
						<!-- BEGIN MOD -->
						<$ if(this?.get && this.get("layer") == "background" || d20plus.cfg.getOrDefault("canvas", "showBackground")) { $>
						<li data-action-type="tolayer_background" class='<$ if(this && this.get && this.get("layer") == "background") { $>active<$ } $>'><span class="pictos ctx__layer-icon">a</span> Background Layer</li>
						<$ } $>
						<!-- END MOD -->
						<li data-action-type="tolayer_objects" class='<$ if(this && this.get && this.get("layer") == "objects") { $>active<$ } $>'><span class="pictos ctx__layer-icon">b</span> Token Layer</li>
						<!-- BEGIN MOD -->
						<$ if(this?.get && this.get("layer") == "foreground" || d20plus.cfg.getOrDefault("canvas", "showForeground")) { $>
						<li data-action-type="tolayer_foreground" class='<$ if(this && this.get && this.get("layer") == "foreground") { $>active<$ } $>'><span class="pictos ctx__layer-icon">B</span> Foreground Layer</li>
						<$ } $>
						<!-- END MOD -->
						<li data-action-type="tolayer_gmlayer" class='<$ if(this && this.get && this.get("layer") == "gmlayer") { $>active<$ } $>'><span class="pictos ctx__layer-icon">E</span> GM Layer</li>
						<li data-action-type="tolayer_walls" class='<$ if(this && this.get && this.get("layer") == "walls") { $>active<$ } $>'><span class="pictostwo ctx__layer-icon">r</span> Lighting Layer</li>
						<!-- BEGIN MOD -->
						<li data-action-type="tolayer_weather" class='<$ if(this && this.get && this.get("layer") == "weather") { $>active<$ } $>'><span class="pictos ctx__layer-icon">C</span> Weather Layer</li>
						<!-- END MOD -->
					</ul>
				</li>
				<$ } $>

				<$ if(this.view && this.get && this.get("sides") !== "" && this.get("cardid") === "") { $>
				<li class='head hasSub' data-menuname='mutliside'>
					Multi-Sided &raquo;
					<ul class='submenu' data-menuname='multiside'>
						<li data-action-type='side_random'>Random Side</li>
						<li data-action-type='side_choose'>Choose Side</li>
						<li data-action-type='rollertokenresize'>Set Side Size</li>
					</ul>
				</li>
				<$ } $>
			</ul>
		</div>
	</script>
	`;
}

SCRIPT_EXTENSIONS.push(initHTMLroll20actionsMenu);
