cd js
call uglifyjs Acc.DC.API.U.js --comments /^!/ --compress --mangle --output Acc.DC.API.js
cd modules
for %%G in (acordion_generator.js aria_menu_module.js aria_tabs_module.js aria_tree_module.js banner_module.js calendar_generator.js carousel_module.js footnote_generator.js modal_module.js popup_module.js scrollable_div_generator.js tooltip_module.js) do (
call uglifyjs %%G --comments /^!/ --compress --mangle --output %%~nG.min.js
)
cd ..\..