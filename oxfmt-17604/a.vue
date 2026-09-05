<template>
  <div>
    <div>
      <div>
        ⚠️ Not compatible with
        {{ incompat.tool


        }}{{ incompat.versions ? ` ${incompat.versions}` : '' }}
      </div>
    </div>
  </div>
</template>
