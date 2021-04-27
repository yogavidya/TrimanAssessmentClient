<template>
<div>
  <b-overlay :show="running" rounded="sm">
    <input type="file" @change="updateFormData" ref="uploadFiles"/>
    <button v-if="files" type="submit" @click="submitFile">Upload</button>
    <div v-if="serverError">
      <h4><br>Sorry, request failed.</h4>
      <h5>Server reports: {{serverError}}</h5>
    </div>
    <div v-if="responseData" style="margin: 5%">
      <p><br>Retrieved {{responseData.data.length}} unique IPs,</p>
      <p>{{overallLogEntries()}} log entries</p>
      <b-list-group v-if="responseData.data.length">
        <b-list-group-item class="d-flex">
          <span class="ip-header clickable" @click="sortBy('ip')">
            <strong>IP</strong>
          </span>
          <span class="fqdn-header clickable"
            @click="sortBy('fqdn')"><strong>Hostname</strong></span>
          <span class="calls-header clickable"
            @click="sortBy('calls')"><strong>Log entries</strong></span>
        </b-list-group-item>
        <b-list-group-item class="d-flex"
        v-for="item in responseData.data" :key="item.ip">
          <span class="ip-entry">{{item.ip}}</span>
          <span class="fqdn-entry">{{item.fqdn}}</span>
          <span class="calls-entry">{{item.calls}}</span>
        </b-list-group-item>
      </b-list-group>
    </div>
  </b-overlay>
</div>
</template>

<script>
import http from '@/common/http';

export default {
  name: 'Home',
  data() {
    return {
      http,
      responseData: undefined,
      serverError: undefined,
      files: undefined,
      running: false,
    };
  },
  methods: {
    updateFormData() {
      this.files = [];
      this.$refs.uploadFiles.files
        .forEach((f) => {
          const formData = new FormData();
          formData.append(f.name, f, f.name);
          this.files.push(formData);
        });
      this.serverError = undefined;
    },
    submitFile() {
      this.running = true;
      this.responseData = undefined;
      http.post('/ParseLogFile', this.files[0], {
        baseURL: this.getAPIBaseURL(),
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      })
        .then((response) => {
          this.responseData = this.addUnresolvedPlaceholders(response.data);
          this.serverError = undefined;
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.errorMessage) {
            this.serverError = error.response.data.errorMessage;
          } else {
            this.serverError = error.message;
          }
        })
        .finally(() => {
          this.running = false;
        });
    },
    getAPIBaseURL() {
      if (process.env.NODE_ENV === 'production') {
        return 'https://lisper.ch/assessment-api';
      }
      return 'https://localhost:44319';
    },
    addUnresolvedPlaceholders(payload) {
      payload.data.forEach((entry) => {
        if (entry.fqdn.length === 0) {
          // eslint-disable-next-line no-param-reassign
          entry.fqdn = '(Unresolved)';
        }
      });
      return (payload);
    },
    overallLogEntries() {
      if (!this.responseData) return 0;
      return this.responseData.data.reduce((acc, val) => acc + val.calls, 0);
    },
    sortCallbackIPV4Captures(captures1, captures2) {
      const strPair2decPair = (index) => [Number(parseInt(captures1[index], 10)),
        Number(parseInt(captures2[index], 10))];
      for (let i = 1; i < 5; i += 1) {
        const vals = strPair2decPair(i);
        if (vals[0] < vals[1]) return -1;
        if (vals[0] > vals[1]) return 1;
      }
      return 0;
    },
    sortByIp() {
      const ipRegexp = /^([\d]+)\.([\d]+)\.([\d]+)\.([\d]+)/im;
      this.responseData.data.sort((entry1, entry2) => {
        const match1 = entry1.ip.match(ipRegexp);
        const match2 = entry2.ip.match(ipRegexp);
        if (match1 == null && match2 == null) {
          return 0;
        }
        if (match1 == null) {
          return -1;
        }
        if (match2 == null) {
          return 1;
        }
        // Both IPV4 addresses
        return this.sortCallbackIPV4Captures(match1, match2);
      });
    },
    sortBy(field) {
      if (field === 'ip') {
        this.sortByIp();
      } else {
        this.responseData.data = this.responseData.data.sort(
          (entry1, entry2) => {
            if (entry1[field] === entry2.field) {
              return 0;
            }
            if (entry2[field] < entry1[field]) {
              return 1;
            }
            return -1;
          },
        );
      }
    }, //
  },
};
</script>
<style lang="scss" scoped>
$table-horizontal-margin: 2em;
$header-vertical-margin: 1em;
$entry-vertical-margin: .75em;

.clickable:hover {
  background-color: lightgrey;
}

.ip-header {
  cursor: pointer;
  width: 25%;
  text-align: left;
  margin-right: $table-horizontal-margin;
  margin-left: $table-horizontal-margin;
  margin-top: $header-vertical-margin;
  margin-bottom: $header-vertical-margin;
}
.fqdn-header {
  cursor: pointer;
  width: 50%;
  text-align: left;
  margin-right: $table-horizontal-margin;
  margin-left: $table-horizontal-margin;
  margin-top: $header-vertical-margin;
  margin-bottom: $header-vertical-margin;
}
.calls-header {
  cursor: pointer;
  width: 25%;
  text-align: right;
  margin-right: $table-horizontal-margin;
  margin-left: $table-horizontal-margin;
  margin-top: $header-vertical-margin;
  margin-bottom: $header-vertical-margin;
}
.ip-entry {
  width: 25%;
  text-align: left;
  margin-right: $table-horizontal-margin;
  margin-left: $table-horizontal-margin;
  margin-top: $entry-vertical-margin;
  margin-bottom: $entry-vertical-margin;
}
.fqdn-entry {
  width: 50%;
  text-align: left;
  margin-right: $table-horizontal-margin;
  margin-left: $table-horizontal-margin;
  margin-top: $entry-vertical-margin;
  margin-bottom: $entry-vertical-margin;
}
.calls-entry {
  width: 25%;
  text-align: right;
  margin-right: $table-horizontal-margin;
  margin-left: $table-horizontal-margin;
  margin-top: $entry-vertical-margin;
  margin-bottom: $entry-vertical-margin;
}

</style>
