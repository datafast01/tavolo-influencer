<script setup></script>

<template>
  <VCard title="Activity Timeline">
    <VCardText>
      <VTimeline
        density="compact"
        align="start"
        line-inset="8"
        truncate-line="both"
      >
        <VTimelineItem dot-color="error" size="x-small">
          <div class="d-flex justify-space-between align-center flex-wrap">
            <h4 class="app-timeline-title me-1 mb-2">
              Email Campaign Launched
            </h4>
            <small class="app-timeline-meta text-no-wrap">Wednesday</small>
          </div>
          <p class="mb-0 app-timeline-text">34 conversions in last 2 days</p>
          <span class="d-flex align-center mt-2">
            <!-- <VIcon
              color="error"
              icon="mdi-file-pdf-box"
              class="me-1"
            /> -->
            <span class="font-weight-medium text-sm">$853 in sales</span>
          </span>
        </VTimelineItem>

        <VTimelineItem dot-color="primary" size="x-small">
          <div class="d-flex justify-space-between align-center flex-wrap">
            <h4 class="app-timeline-title me-1 mb-2">
              Text Campaign Launched 😎
            </h4>
            <small class="app-timeline-meta text-no-wrap">Wednesday</small>
          </div>

          <p class="mb-1 app-timeline-text">51 conversions in last 2 days</p>

          <div class="d-flex align-center mt-3">
            <!-- <VAvatar
              size="24"
              class="me-2"
              :image="avatar2"
            /> -->
            <div>
              <p class="font-weight-medium mb-0">$1,083 in sales</p>
            </div>
          </div>
        </VTimelineItem>

        <VTimelineItem dot-color="info" size="x-small">
          <div class="d-flex justify-space-between align-center flex-wrap">
            <h4 class="app-timeline-title me-1 mb-2">
              Organic Video Launched on 4 Platforms
            </h4>
            <small class="app-timeline-meta text-no-wrap">Wednesday</small>
          </div>
          <p class="mb-0 app-timeline-text">382k impressions in last 7 days</p>
        </VTimelineItem>

        <VTimelineItem dot-color="warning" size="x-small">
          <div class="d-flex justify-space-between align-center flex-wrap">
            <h4 class="app-timeline-title me-1">
              New campaign generated go to email & auto sending pages to review.
            </h4>
          </div>
        </VTimelineItem>
      </VTimeline>
    </VCardText>
  </VCard>
</template>
