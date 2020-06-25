# Here is a simple makefile
# The h5p pack command was not working without a subfolder with a .git in it.define
PACKAGE_FILES= h5p.json \
                H5P.SoftSkills/umd/h5p-softskills.js \
                H5P.SoftSkills/umd/h5p-softskills.css \
                H5P.SoftSkills/umd/MaterialIcons* \
                H5P.SoftSkills/library.json \
                H5P.SoftSkills/semantics.json \
                H5P.SoftSkills/assets/* \
                H5P.SoftSkills/icon.svg \
                content/content.json

ZIP_COMMAND=zip

package:
	$(MAKE) -C build all
	$(ZIP_COMMAND) h5p-softskills-app.h5p $(PACKAGE_FILES)
	cp h5p-softskills-app.h5p h5p-softskills.h5p
	#$(ZIP_COMMAND) build/h5p-softskills-deps.h5p h5p-softskills-app.h5p --copy --out h5p-softskills.h5p
	cd build && $(ZIP_COMMAND) -urD ../h5p-softskills.h5p FontAwesome-4.5/* -x 'FontAwesome-4.5/README.md' H5PEditor.VerticalTabs-1.3
	cd build && $(ZIP_COMMAND) -urD ../h5p-softskills.h5p  H5PEditor.VerticalTabs-1.3/* -x 'H5PEditor.VerticalTabs-1.3/README.md'
