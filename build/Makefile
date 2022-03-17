# H5P Library package
PACKAGE_FILES=  H5P.SoftSkills/umd/h5p-softskills.js \
                H5P.SoftSkills/umd/h5p-softskills.css \
                H5P.SoftSkills/umd/MaterialIcons* \
                H5P.SoftSkills/library.json \
                H5P.SoftSkills/semantics.json \
                H5P.SoftSkills/assets/* \
                H5P.SoftSkills/icon.svg
ZIP_COMMAND=zip
TEMP_DIR := $(shell mktemp -d)

all:
	cd ${TEMP_DIR} && h5p get h5p-editor-vertical-tabs font-awesome
	cd ${TEMP_DIR} && h5p pack h5p-editor-vertical-tabs font-awesome h5p-softskills-libs.h5p
	cd ../H5P.SoftSkills && npm run build
	rsync -avz ../H5P.SoftSkills ${TEMP_DIR} --exclude 'node_modules' --exclude 'src'
	cd ${TEMP_DIR} && $(ZIP_COMMAND) -urD h5p-softskills-libs.h5p $(PACKAGE_FILES)
	cp ${TEMP_DIR}/h5p-softskills-libs.h5p .

