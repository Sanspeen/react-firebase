package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Mono;
import java.util.Objects;
import static org.mockito.Mockito.when;

@SpringBootTest
class CreateUseCaseTest {

    @SpyBean
    private CreateUseCase createUseCase;

    @MockBean
    private QuestionRepository repository;

    @Test
    @DisplayName("Creat un recurso")
    void createResource(){

        var resourceDT0 = new QuestionDTO("abc","xxx","yyy","React o Angular","tecnologia",
                "xxx@gmail.com");

        var resource = new Question();
        resource.setId("abc");
        resource.setUserId("xxx");
        resource.setQuestion("yyy");
        resource.setType("React o Angular");
        resource.setCategory("tecnologia");
        resource.setUserEmail("xxx@gmail.com");

        when(repository.save(Mockito.any(Question.class))).thenReturn(Mono.just(resource));

        var result = createUseCase.apply(resourceDT0);

        Assertions.assertEquals(Objects.requireNonNull(result.block()),"abc");
    }
}