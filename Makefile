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
	$(ZIP_COMMAND) h5p-softskills.h5p $(PACKAGE_FILES)
