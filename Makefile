# Here is a simple makefile
# The h5p pack command was not working without a subfolder with a .git in it.define

ZIP_COMMAND=zip
TEMP_DIR := $(shell mktemp -d)

package: bachelor-informational bachelor-transversal
		@echo "Now, upload the h5p-softskills-libs.h5p in the H5P library (admin)"
		@echo "And then any of the 'softskills-bachelor-transversal.h5p' and 'h5p-softskills-bachelor-informational.h5p' into a course"

#package-transversal: package-base
#		cp h5p-softskills-base.h5p h5p-softskills-bachelor-transversal.h5p
#		rm -rf build/content
#		cp -r bachelor-transversal/content build/
#		cp h5p-transversal.json build/h5p.json
#		cd build && $(ZIP_COMMAND) -urD ../h5p-softskills-bachelor-transversal.h5p FontAwesome-4.5/* -x 'FontAwesome-4.5/README.md' content/content.json

bachelor-informational bachelor-transversal: package-base
		cp -r $@/content ${TEMP_DIR}
		cp $@/h5p.json  ${TEMP_DIR}
		cp $@/icon.svg ${TEMP_DIR}
		cd ${TEMP_DIR} && $(ZIP_COMMAND) h5-softskills-$@.h5p h5p.json icon.svg content/content.json content/images/*
		cp ${TEMP_DIR}/*.h5p .

package-base:
		$(MAKE) -C build all
		cp build/h5p-softskills-libs.h5p h5p-softskills-libs.h5p
