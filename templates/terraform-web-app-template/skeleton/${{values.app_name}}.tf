module "${{ values.app_name }}" {
  source    = "./modules/web-app"
  app_name  = "${{ values.app_name }}"
  namespace = "${{ values.namespace }}"
  replicas  = ${{ values.replicas }}
}
