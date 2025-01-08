    package com.adobe.aem.guides.wknd.core.models;
    import com.adobe.cq.sightly.WCMUsePojo;
    import com.day.cq.dam.api.Asset;
    import org.apache.sling.api.resource.Resource;
    import org.apache.sling.models.annotations.DefaultInjectionStrategy;
    import org.apache.sling.models.annotations.Model;
    import org.apache.sling.models.annotations.Via;
    import org.apache.sling.models.annotations.injectorspecific.Self;
    import org.apache.sling.models.annotations.injectorspecific.SlingObject;
    import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
    import org.apache.commons.io.IOUtils;
    import org.apache.sling.api.resource.Resource;
    import org.apache.sling.api.resource.ResourceResolver;
    import java.io.InputStream;
    
    import javax.annotation.PostConstruct;
    import javax.inject.Inject;
    import java.nio.charset.StandardCharsets;
    import java.util.ArrayList;
    import java.util.List;
    import com.google.gson.Gson;
    import com.google.gson.reflect.TypeToken;
    import org.slf4j.Logger;
    import org.slf4j.LoggerFactory;
    
    @Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
    public class EmployeeTableModel {
        private static final Logger LOG = LoggerFactory.getLogger(EmployeeTableModel.class);
        @ValueMapValue
        private String jsonPath;
    
        @Self
        private Resource resource;
    
        @SlingObject
        private ResourceResolver resourceResolver;
    
        private List<Employee> employees = new ArrayList<>();
    
        @PostConstruct
        protected void init() {
            LOG.info("Initializing EmployeeTableModel...");
            if (jsonPath != null) {
                LOG.info("JSON Path provided: {}", jsonPath);
                try {
                    if (resourceResolver == null) {
                        LOG.error("ResourceResolver is null. Unable to resolve the resource2...");
                        return;
                    }
                    Resource damResource = resourceResolver.getResource(jsonPath);
                    if (damResource == null) {
                        LOG.warn("No resource found at the provided JSON path: {}", jsonPath);
                        return;
                    }
    
                    LOG.info("Resource found at JSON path: {}", jsonPath);
                    Asset asset = damResource.adaptTo(Asset.class);
                    if (asset == null) {
                        LOG.warn("The resource at {} is not a valid asset.", jsonPath);
                        return;
                    }
                    LOG.info("Asset successfully adapted at path: {}", jsonPath);
    
                    if (asset != null) {
                        InputStream is = asset.getOriginal().getStream();
                        String jsonString = IOUtils.toString(is, StandardCharsets.UTF_8);
                        LOG.debug("JSON content retrieved: {}", jsonString);
    
                        Gson gson = new Gson();
                        employees = gson.fromJson(jsonString, new TypeToken<List<Employee>>() {}.getType());
                        LOG.info("Successfully parsed JSON into employee list. Total employees: {}", employees.size());
                    }
                } catch (Exception e) {
                    LOG.error("Error occurred while processing the JSON file at path: {}", jsonPath, e);
                    // Handle exception
                }
            }
        }
    
        public List<Employee> getEmployees() {
            return employees;
        }
    
    }
